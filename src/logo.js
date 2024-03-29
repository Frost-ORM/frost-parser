import { Color, } from "./helpers/logger";

const LOGO_ASCII_30 = `
@@@@@@@@@@@@@#@@@@@@@@@@@
@@@@@@@@@@@@#PB@@@@@@@@@@
@@@@@@@@@@@#PPPP&@@@@@@@@
@@@@@@@@@@GPPPPPP@@@@@@@@
@@@@@@@@#PPPPPPP&@@@@@@@@
@@@@@@&BGGGGPPB@@@@@@@@@@
@@@@@#BBBGGGB@@@@&@@@@@@@
@@@&#BBBBBB&@@@@#PB@@@@@@
@@&######&@@@@&BGGPG@@@@@
@&&&&##&@@@@@#BBBGG#@@@@@
@&&&&&@@@@@&#BBBB#&@@@@@@
@@&&&@@@@@&#####&@@@@@@@@
@@@@@@@@@&&&&#&@@@@@@@@@@
@@@@@@@@@&&&&@@@@@@@@@@@@
@@@@@@@@@@&&@@@@&&&@@@@@@
@@@@@@@@@@@@@@@@&&&&@@@@@
@@@@@@@@@@@@@@@@&&&&&&@@@
@@@@@@@@@@@@@@@@@@&&&&&&@
@@@@@@@@@@@@@@@@@@@@&&&&@
@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@`
const LOGO_ASCII_40 =
`@@@@@@@@@@@@@@@@@@@@&&@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@BP#@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@&PPPG&@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@&PPPPPP#@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@#PPPPPPPPB@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@BPPPPPPPPPP#@@@@@@@@@@@@
@@@@@@@@@@@@@@&GPPPPPPPPPPP&@@@@@@@@@@@@
@@@@@@@@@@@@@BPPPPPPPPPPPG@@@@@@@@@@@@@@
@@@@@@@@@@@&GGGGGPPPPPPG&@@@@@@@@@@@@@@@
@@@@@@@@@&BGGGGGGGGGPP#@@@@@@@@@@@@@@@@@
@@@@@@@@#BBBBBGGGGGG#@@@@@@&@@@@@@@@@@@@
@@@@@@&#BBBBBBBBGGB@@@@@@@&PG&@@@@@@@@@@
@@@@@######BBBBBB&@@@@@@@&GGPPB@@@@@@@@@
@@@&#########BB&@@@@@@@@BGGGGGPG@@@@@@@@
@@&&&########&@@@@@@@@&BGGGGGGGP@@@@@@@@
@&&&&&&&####@@@@@@@@@#BBBBBBGGG&@@@@@@@@
@&&&&&&&&&&@@@@@@@@&BBBBBBBBBB@@@@@@@@@@
@@&&&&&&&@@@@@@@@@######BBB#&@@@@@@@@@@@
@@@&&&&&@@@@@@@@&#########&@@@@@@@@@@@@@
@@@@@@&&@@@@@@@&&&&#####&@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@&&&&&&&#&@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@&&&&&&&&@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@&&&&&&@@@@@@&#@@@@@@@@@@@@
@@@@@@@@@@@@@@@@&&&@@@@@@@&&#&@@@@@@@@@@
@@@@@@@@@@@@@@@@@@&@@@@@@&&&&&&@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@&&&&&&&&@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@&&&&&&&&&&@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@&&&&&&&&&&&@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@&&&&&&&&&&@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&&&&&&&@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&&&&&@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`
export const LOGO_WITH_BF = Color.Bright+Color.BgWhite+Color.FgBlue+(
LOGO_ASCII_30
).replaceAll('@',' ').replaceAll('\n',Color.Reset+'\n'+Color.Bright+Color.BgWhite+Color.FgBlue)+Color.Reset+Color.Reverse

export const LOGO = Color.Bright+Color.FgBlue+(
LOGO_ASCII_30
).replaceAll('@',' ')+Color.Reset+Color.Reverse