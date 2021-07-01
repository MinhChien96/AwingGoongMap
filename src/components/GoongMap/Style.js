import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    iconLocation: {
        color: 'red',
        transform: 'translate(-20px,-40px)',
    },
    contentSearch: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 9,
    },
    buttonFullScreen: {
        right: 10,
        top: 10,
    },
}));
