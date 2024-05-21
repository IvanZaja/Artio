import {useContext} from "react";
import {FileContext} from "../contexts/file.context";

export const useFile = () => useContext(FileContext);