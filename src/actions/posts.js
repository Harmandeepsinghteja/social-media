import {UPDATE_POSTS} from './actionTypes.js'

export function fetchPosts(){
    return (dispatch) => {
        const url = 'http://codeial.com:8000/api/v2/posts?page=1&limit=5'
        fetch(url)
        .then(respose => {
            console.log("SDas");
            return respose.json();
        }).then((data) => {
            console.log(data);
            dispatch(updatePosts(data.data.posts));
        })
    
    }
}


export function updatePosts(posts){
    return {
        type:UPDATE_POSTS,
        posts
    }
}