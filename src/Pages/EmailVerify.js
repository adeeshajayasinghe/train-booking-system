import React, { useState, useEffect, Fragment } from 'react';
import Success from '../images/Success-img.png';
import Button from '@mui/joy/Button';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';

const EmailVerify = () => {
    const [validUrl, setValidUrl] = useState(null);
    const params = useParams(); // dynamically gets the parameters from the url

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                console.log('params.id:', params.id);
                console.log('params.emailToken:', params.emailToken);
                const url = `http://localhost:4000/register/${params.id}/verify/${params.emailToken}`;
                const {data} = await axios.get(url);
                console.log(data);
                setValidUrl(true);
            } catch(error) {
                setValidUrl(false);
                console.log(error);
            }
        };
        verifyEmailUrl();
    }, [params]);

    // Render loading state while verifying
    if (validUrl === null) {
        return <h2 className='centered'>Loading...</h2>;
    }

    return (
        <Fragment>
            {validUrl ? (
                <section className='hero'>
                    <div className='hero-center'>
                        <article className='hero-info'>
                            <br />
                            <br />
                            <br />
                            <article className='hero-images'>
                                <img src={Success} className='login-img' alt='login' />
                            </article>
                            
                        </article>
                        <article>
                            <h2 className='verify-text'>Account Verified Successfully!</h2>
                            {/* <Button variant="contained" color="success" component={Link} to={'/login'}>Login</Button> */}
                            <Link to="/login">
                                <button className='btn-verify'>
                                    Login
                                </button>
                            </Link>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                        </article>
                    </div>
                </section>
            )
            :(
                <h2 className='centered'>404 Not Found</h2>
            )
            }
        </Fragment>
    );

}

export default EmailVerify;