import type { MusicPlayerConfig } from "../types/config";

// Music player configuration
export const musicPlayerConfig: MusicPlayerConfig = {
	// How to disable the music player:
	// 1. Sidebar: in sidebarConfig.ts, set the music component enable to false
	// 2. Navbar: in this file, set showInNavbar to false

	// Display music player in the navigation bar
	showInNavbar: true,

	// Mode: "meting" for Meting API, "local" for local music playlist
	mode: "meting",

	// Default volume (0-1)
	volume: 0.7,

	// Play mode: 'list'=loop list, 'one'=loop single, 'random'=random play
	playMode: "random",

	// Enable lyrics
	showLyrics: false,

	// Meting API Config (Note: Spotify is not supported here)
	meting: {
		// Meting API URL (Using a stable alternative endpoint)
		api: "https://api.injahow.cn/meting/?server=:server&type=:type&id=:id",
		// Music platform: netease, tencent, kugou, xiami, baidu
		server: "netease",
		// Type: song, playlist, album, search, artist
		type: "playlist",
		// Confirmed stable LoFi Hip Hop playlist ID
		id: "2829816518",
		auth: "",
		fallbackApis: [
			"https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id&r=:r",
			"https://api.moeyao.cn/meting/?server=:server&type=:type&id=:id",
		],
	},

	// Local music config (used when mode is 'local')
	local: {
		playlist: [
			{
				name: "If I Could",
				artist: "LOFI",
				url: "/assets/music/demo.mp3",
				cover: "/assets/music/cover/default.webp",
				lrc: "",
			},
		],
	},
};
