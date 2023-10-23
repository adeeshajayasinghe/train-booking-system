import WatchLaterIcon from '@mui/icons-material/WatchLater';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';

export const AdminSidebarData = [
    {
        title:'Change Schedule',
        icon: <WatchLaterIcon fontSize='small'/>,
        children:[
           
            {
                title:'Train Details',
                path: '/modify-schedules'
            },
            {
                title:'Routes Details',
                path: '/routedetails'
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
            {
                title:'Booking History',
                path:'/booking-history'
            }
        ]
    },
    {
        title:'User Settings',
        icon: <SettingsIcon />,
        path: '/user-settings'
    }
]