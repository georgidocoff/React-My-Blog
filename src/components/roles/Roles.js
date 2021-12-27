import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

import { getRoles } from "../../services/userService";
import Loading from '../loading/Loading';

function Roles() {
    let getAll = getRoles().catch((err) => { console.log(err) });
    const [roles, setRoles] = useState([]);
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        setShowLoading(true);
        getAll.then((res) => {
            //console.log(res?.result.items);
            setShowLoading(false);
            setRoles(res?.result.items);
        });
    }, []);

    return (
        !showLoading
        ?<Table responsive>
            {roles?.length > 0 &&
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Displayname</th>
                        <th hidden>Normalize</th>
                        <th hidden>Description</th>
                        <th>GrantedPermissions</th>
                    </tr>
                </thead> || <thead><tr><th>No data avaiable...</th></tr></thead>}
            <tbody>
                {roles?.map((x) => (
                    <tr key={x.id}>
                        <td>{x.id}</td>
                        <td>{x.name}</td>
                        <td>{x.displayName}</td>
                        <td hidden>{x.normalizedName}</td>
                        <td hidden>{x.description}</td>
                        <td>{x.grantedPermissions.join(", ")}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        :<Loading/>
    );
}

export default Roles;
