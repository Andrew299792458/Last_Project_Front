import axios from 'axios';

export default function ClearMsg({ to, setMe, setCompanion }) {

    const DeleteCollection = async () => {
        setMe("")
        setCompanion("")
        try {
            const response = await axios.delete('http://localhost:3001/collection', {
                headers: {
                    to: to,
                    "x-access-token": localStorage.getItem("userToken")
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <button onClick={DeleteCollection}>Clear</button>
        </>
    )

}

