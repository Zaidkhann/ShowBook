export const handleLogout = async(router:any)=>{
    try{
        const res = await fetch("http://localhost:5000/api/auth/logout",{
            method : "Post",
            headers:{
                "Content-Type" : "application/json"
            },
            credentials:"include"
    
        }
        )
        if(res.ok){
            router.push("/login")
        }else {
      console.error("Logout failed:", res.status);
    }
    }catch(err){
        console.log("Logout Failed: ",err)
    }

}