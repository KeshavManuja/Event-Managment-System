import { Alert, Pagination } from "@mui/material";
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { EventCard } from "../Components/EventCard";
import Navbar from "../Components/Navbar";
import { getMyEvents, GET_MY_EVENTS } from "../redux/Action";

export const MyEvents = () => {
    const dispatch = useDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const { totalCount } = useSelector((store) => store);
    const { myEvents } = useSelector((store) => store);
    const { userID } = useSelector((store) => store);
    const [page, setPage] = useState(1);
    useEffect(() => {
        userID && dispatch(getMyEvents(userID, page, cookies?.token));
    }, [page])

    return (
        <>
            <Navbar />
            <h3><i>My Events</i></h3>
            {myEvents.length === 0 && (
                <Alert className="alert-box" severity="warning">
                    There is no events created till now. Please add events.
                </Alert>
            )}
            <div className="events-div">
                {myEvents && myEvents.map((event) => (
                    <EventCard key={event._id} item={event} page={page} />
                ))}
            </div>

            <div className="pagination-div">

                <Pagination page={page} onChange={(e, curPage) => setPage(curPage)} count={totalCount} variant="outlined" shape="rounded" />
            </div>
        </>
    )

}