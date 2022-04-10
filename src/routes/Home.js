import Nweet from "components/Nweet";
import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import {v4 as uuidv4} from 'uuid';

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [file, setFile] = useState("");
    

    // const getNweets = async() => {
    //     const dbNweets = await dbService.collection("nweets").get();
    //     dbNweets.forEach((document) => {
    //         const nweetObject = {
    //             ...document.data(),
    //             id: document.id
    //         }
    //         setNweets((prev) => [nweetObject, ...prev]);
    //     });
    // };

    useEffect(() => {
        dbService.collection("nweets").onSnapshot((snapshot) => {
            const nweetArray = snapshot.docs.map( (doc) => ({
                id: doc.id, 
                ...doc.data(),
            }));

            setNweets(nweetArray);
        });
    }, []);

    const onSubmit = async(event) => {
         event.preventDefault();
        let filetUrl = "";
        if( file !== ""){
            const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await fileRef.putString(file, "data_url");
            filetUrl = await response.ref.getDownloadURL();
            
        }
        const nw = {
            text:nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            filetUrl
    }
         await dbService.collection("nweets").add(nw);
        setNweet("");
        setFile("");
    };
    
    const onChange = (event) =>{
        const {target:{value}} = event;
        setNweet(value);
    };
    
    const onFileChange = (event) => {
        const {target: {files},} = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {currentTarget: {result},}  = finishedEvent;
            setFile(result);
        };
        reader.readAsDataURL(theFile); 
    };

    const onClearPhotClick = () => {setFile("null")};

    return (
    <div>
        <form onSubmit={onSubmit}>
            <input 
                value={nweet}
                onChange={onChange}
                type="text" 
                placeholder="What's on your mind?" 
                maxLength={120} />
            <input type="file" accept="image/*" onChange={onFileChange}/>
            <input type="submit" value="Nweet" />
            {file && 
                <div>
                    <img src={file} width="50px" height="50px" />
                    <button onClick={onClearPhotClick}>Clear</button>
                </div>}
        </form>
        <div>
            {nweets.map((nweet) => (
                <Nweet 
                    key = {nweet.id} 
                    nweetObj={nweet} 
                    isOwner={nweet.creatorId === userObj.uid}/>
            ))}
        </div>
    </div>
    );
};

export default Home;