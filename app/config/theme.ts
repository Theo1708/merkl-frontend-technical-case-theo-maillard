import { createColoring } from "dappkit";

export default {
	default: {
		base: createColoring(
			["#DD3C44", "#8B8D98", "#000000"],
			["#8B8D98", "#9984D2", "#FFFFFF"],
		),
		info: createColoring(
			["#2ABDFF", "#2ABDFF", "#131620"],
			["#FFFFFF", "#40B66B", "white"],
		),
		good: createColoring(
			["#40B66B", "#40B66B", "#131620"],
			["#FFFFFF", "#40B66B", "white"],
		),
		warn: createColoring(
			["#ff9600", "#ff9600", "#131620"],
			["#FFFFFF", "#40B66B", "white"],
		),
		harm: createColoring(
			["#d22e14", "#d22e14", "#131620"],
			["#FFFFFF", "#40B66B", "white"],
		),
	},
};
