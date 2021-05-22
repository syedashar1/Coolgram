import React, { useEffect , useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SinglePost from '../components/SinglePost';
import { SocketProvider } from '../chat/contexts/SocketProvider';

export default function SavedPosts() {


        const userInfo = useSelector((state) => state.userSignin.userInfo);
        const user = useSelector((state) => state.getDetails.user);

        const [State, setState] = useState(null)

        useEffect(() => {
                setState(user.savedPosts.reverse())
        }, [])


        return (
                <div> <h1>Saved Posts</h1>
                        {State && user._id === userInfo._id &&
                                <SocketProvider id={userInfo._id }>
                                        {
                                        State.map( x => 
                                        <SinglePost id={x.postedBy} postid={x.postId} />
                                        )
                                        }
                                </SocketProvider> 
                        }
                        {user && user._id === userInfo._id &&  user.savedPosts.length === 0 && <p>u have no saved posts</p> }  
                </div>
        )
}
