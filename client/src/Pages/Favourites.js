import { Storefront } from "@material-ui/icons";
import { Alert, Button, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { EventCard } from "../Components/EventCard";
import Navbar from "../Components/Navbar";
import { getFavourites } from "../redux/Action";

export const Favourites = () => {
  const { userFav } = useSelector((store) => store);
  const { userID } = useSelector((store) => store);
  const { totalCount } = useSelector((store) => store);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    userID && dispatch(getFavourites(userID, page, cookies?.token));
  }, [page])
  console.log(userFav)
  return (
    <div>
      <Navbar />
      {userFav.length === 0 && (
        <Alert className="alert-box" severity="warning">
          There is no favourites yet, please add.
        </Alert>
      )}
      {userFav.length !== 0 && (
        <>
          <div className="events-div">
            {userFav &&
              userFav.map((event) => (
                <EventCard key={event._id} item={event} />
              ))}
          </div>


          <div className="pagination-div">

            <Pagination page={page} onChange={(e, curPage) => setPage(curPage)} count={totalCount} variant="outlined" shape="rounded" />
          </div>
        </>
      )}
    </div>
  );
};
