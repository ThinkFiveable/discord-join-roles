import { Client, Constants } from "discord.js";
import * as Colors from "colors";
import { config } from "dotenv";
import { join } from "path";
import { BotEnv } from "./typings";

config({
    path: join(__dirname, "..", ".env"),
});

if (!process.env.JOIN_ROLES) throw new Error("Missing join roles in env variable!");
if (!process.env.DISCORD_TOKEN) throw new Error("Need a bot token in env variable!");
if (!process.env.GUILD_ID) throw new Error("Need a guild id in env variable!");

const BotConfig: BotEnv = {
    DISCORD_TOKEN: process.env.DISCORD_TOKEN,
    GUILD_ID: process.env.GUILD_ID,
    JOIN_ROLE_IDS: process.env.JOIN_ROLES.split(","),
};

const client = new Client({
    messageCacheLifetime: 60,
    messageCacheMaxSize: 1,
    messageSweepInterval: 900000,
    intents: ["GUILDS", "GUILD_MEMBERS"],
    partials: ["GUILD_MEMBER"],
});

const warn = (str: string) => console.log(Colors.yellow(str));
const error = (str: string) => console.log(Colors.red(str));
const success = (str: string) => console.log(Colors.green(str));

client.on(Constants.Events.CLIENT_READY, () => {
    if (!client.guilds.cache.has(BotConfig.GUILD_ID)) {
        error(`I am not in the guild with the ID of: ${BotConfig.GUILD_ID}! Terminating connection...`);
        client.destroy();
        process.exit(1);
    }
    success(`Successfully started up bot! Currently logged in as: ${client.user!.tag}`);
});

client.on(Constants.Events.GUILD_CREATE, (guild) => {
    if (guild.id !== BotConfig.GUILD_ID) {
        warn(`Attempted to be added to a guild (${guild.id}) that isn't specified in my ENV file, leaving server...`);
        guild.leave();
    }
});

client.on(Constants.Events.GUILD_MEMBER_ADD, async (member) => {
    if (member.guild.id !== BotConfig.GUILD_ID) {
        warn(`Detected member join, but this is a guild (${member.guild.id}) not in my ENV file! Leaving server...`);
        return member.guild.leave();
    }

    if (!member.pending) {
        try {
            await member.roles.add(BotConfig.JOIN_ROLE_IDS, "Auto role on join.");
            return success(`Successfully added roles on join to ${member.user.tag} (${member.id})`);
        } catch (e) {
            error(`Issue assigning role to member ${member.user.tag} (${member.id}) on join! ${e.toString()})}`);
        }
    }
});

client.on(Constants.Events.GUILD_MEMBER_UPDATE, async (oldMember, newMember) => {
    if (oldMember.guild.id !== BotConfig.GUILD_ID) {
        warn(
            `Detected member update, but this is a guild (${oldMember.guild.id}) not in my ENV file! Leaving server...`,
        );
        return oldMember.guild.leave();
    }

    if (oldMember.pending && !newMember.pending) {
        try {
            await newMember.roles.add(BotConfig.JOIN_ROLE_IDS, "Auto role on join.");
            return success(
                `Successfully added roles on pass of member gating to ${newMember.user.tag} (${newMember.id})`,
            );
        } catch (e) {
            error(`Issue assigning role to member ${newMember.user.tag} (${newMember.id}) on update! ${e.toString()}`);
        }
    }
});
