import axios from 'axios';



const getPostList = async () => {
	return axios
		.get("https://jsonplaceholder.typicode.com/posts")
		.then(res => res.data)
		.catch(e => {
			console.error(e);
		});
};


export const postApi = {
	getPostList
};