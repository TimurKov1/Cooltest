import { useEffect } from "react";
import { useNavigate } from "react-router";

export function Redirect({to}) {
    const navigate = useNavigate()

    useEffect(() => {
        navigate(to)
    }, [])
    
    return
}