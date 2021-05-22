import React, { useEffect , useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Fade from 'react-reveal/Fade';

export default function NamePic({id , comment , bystate }) {



        const [state ,setState ] = useState({})
        const [loading, setloading] = useState(false)
        const history = useHistory()


        useEffect(() => {
                
                setloading(true)
                axios.get(`/api/users/single/${id}`)
                .then(res => {
                        setState(res.data);
                        setloading(false)
                } )

                

        }, [ ]);


        return (
                <div>
                        {bystate ? 
                        <Fade cascade>
                        {!loading && state !== {} && 
                        <div>
                        <img style={{height:'50px',width:'50px',border:'50%'}} src={state.profilePic} />
                        <p onClick={ () => {history.push(`/user/${id}`)} } >{state.name}</p>
                        <p>{comment}</p>
                        </div>
                        }
                        </Fade> : 
                        <div>
                        {!loading && state !== {} && 
                        <div>
                        <img style={{height:'50px',width:'50px',border:'50%'}} src={state.profilePic} />
                        <p onClick={ () => {history.push(`/user/${id}`)} } >{state.name}</p>
                        <p>{comment}</p>
                        </div>
                        }
                        </div>
                        }
                        
                </div>
        )
}

