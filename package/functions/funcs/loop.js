const interpreter = require("../../interpreter.js")

//const db = require("quick.db")
const loop = async d => {

    const code = d.command.code

    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) return d.error(err)

    const times = Number(inside.splits[0])

    if (isNaN(times) || times < 1) return d.error(`:x: Invalid times number at \`$loop${inside}\``)

    const commands = inside.splits.slice(1)

    for (let i = 0;i < times;i++) {
        for (const command of commands) {
            const cmd = d.client.awaited_commands.find(c => c.name === command)

            if (!cmd) return d.error(`:x: Invalid awaited command '${command}' in \`$loop${inside}\``)

            await interpreter(d.client, d.message, d.args, cmd, undefined, false)
        }
    }

    return {
        code: code.replaceLast(`$loop${inside}`, "")
    }
}

module.exports = loop