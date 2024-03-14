const Discord = require("discord.js");

const { GatewayIntentBits, Partials, ChannelType } = require('discord.js');

const { ActivityType } = require("discord.js");

const sourcebin = require('sourcebin');

const config = require("./config.json");

// DB
const { QuickDB } = require('quick.db');
global.db = new QuickDB();
//

const client = new Discord.Client({
    intents: [
        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.AutoModerationExecution,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent
    ],
    partials: [ // mesma coisa do intents
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Message,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.User
    ]
});

global.embed_color = config.client.embed;

module.exports = client

client.on('interactionCreate', (interaction) => {

    if (interaction.type === Discord.InteractionType.ApplicationCommand) {

        const cmd = client.slashCommands.get(interaction.commandName);

        if (!cmd) return interaction.reply({ content: `Erro, este comando não existe`, ephemeral: true });

        interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction)

    }
});

client.on("ready", () => {
    console.log(`PedroaCode | Server™`)
    console.log(`🤖 My name is ${client.user.username}`)
    console.log(`💔 I have ${client.users.cache.size} friends`)
    console.log(`👨 More than ${client.guilds.cache.size} groups support me.`)
});

/*============================= | Import handler | =========================================*/

client.slashCommands = new Discord.Collection()

require('./handler')(client)

client.login(config.client.token)

/*============================= | SYSTEM TICKET | =========================================*/

client.on("interactionCreate", require('./events/startTicket').execute);
/*============================= | ANTI-CRASH | =========================================*/

process.on('uncaughtExceptionMonitor', (error, origin) => { });

process.on('uncaughtExceptionMonitor', (error, origin) => { });
              process.on('unhandledRejection', (reason, p) => {
                console.log('=====[ ANTI CRASH 1 ]=====')
                console.log(reason, p)
                console.log('==========================')
            })
            
            process.on("uncaughtException", (err, origin) => {
                console.log('=====[ ANTI CRASH 2 ]=====')
                console.log(err, origin)
                console.log('========================')
            }) 
            
            process.on('uncaughtExceptionMonitor', (err, origin) => {
                console.log('=====[ ANTI CRASH 3 ]=====')
                console.log(err, origin)
                console.log('========================')
            })