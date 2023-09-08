import WatchLaterIcon from '@mui/icons-material/WatchLater';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';

export const AdminSidebarData = [
    {
        title:'Change Schedule',
        icon: <WatchLaterIcon fontSize='small'/>,
        children:[
            {
                title:'Add Trains',
                path: '/admin'
            },
            {
                title:'Modify Schedules',
                path: '/modify-schedules'
            },
            {
                title:'Remove Trains',
                path: '/remove-trains'
            }
        ]
    },
    {
        title:'View Analytics',
        icon: <BarChartIcon fontSize='small'/>,
        children:[
            {
                title:'Payment Analytics',
                path: '/payment-analytics'
            },
            {
                title:'Ticket Analytics',
                path: '/ticket-analytics'
            },
        ]
    },
    {
        title:'User Settings',
        icon: <SettingsIcon />,
        path: '/user-settings'
    }
]