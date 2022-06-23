export const EventCard = ({item}) =>{

    return (
        <div className="eventcard-div">
                <h2>Title: {item.title}</h2>
                <p>City : {item.address}</p>
                <p>Helding {item.isVirtual?"Yes":"No"}</p>
                <p>Category: {item.category}</p>
                <div style={{display:"flex"}}>
                    <span>Tags: </span>
                    {item.tags.map((tag,index)=> {
                        return <div key={index} className="tags-div">{tag}</div>
                    })}
                    
                </div>
        </div>
    )
}