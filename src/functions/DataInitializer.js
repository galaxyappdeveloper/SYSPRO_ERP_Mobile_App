import { useDispatch } from "react-redux";
import { loadMpinData, loadUserData } from "../redux/authSlices/AuthSlice";
import { useEffect } from "react";

const DataInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMpinData());
    dispatch(loadUserData());
  }, [dispatch]);

  return null;
};

export default DataInitializer;
