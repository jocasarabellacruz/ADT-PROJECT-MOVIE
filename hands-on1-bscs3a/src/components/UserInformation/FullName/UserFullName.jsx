import './FullName.css';

function UserFullName({firstname, middlename, lastname}){
    return(
        <div className=""> 
            <h1>
                <span className="FName">{firstname}</span>
                <span className="MName"> {middlename}</span>
                <span className="LName"> {lastname}</span>
            </h1>
        </div>
    )
}

export default UserFullName