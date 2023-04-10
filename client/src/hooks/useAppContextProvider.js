import { useContext } from "react";
import AppContext from "../context/AppContextProvider";

export default function useContextProvider() {

    return useContext(AppContext)
}