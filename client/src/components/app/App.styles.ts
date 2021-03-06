import { Theme, createStyles, createMuiTheme } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

export const appTheme = createMuiTheme({
    palette: {
        primary: grey
    }
});

export const appStyles = ((theme: Theme) => createStyles({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(1100 + theme.spacing(3) * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    toolbarMain: {
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
    },
    mainFeaturedPost: {
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
    },
    mainFeaturedPostContent: {
        padding: `${theme.spacing(6)}px`,
        [theme.breakpoints.up('md')]: {
            paddingRight: 0,
        },
    },
    mainGrid: {
        marginTop: theme.spacing(3),
    },
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    cardMedia: {
        width: 160,
    },
    markdown: {
        padding: `${theme.spacing(3)}px 0`,
    },
    sidebarAboutBox: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.grey[200],
    },
    sidebarSection: {
        marginTop: theme.spacing(3),
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing(8),
        padding: `${theme.spacing(6)}px 0`,
    },
}))(appTheme);
