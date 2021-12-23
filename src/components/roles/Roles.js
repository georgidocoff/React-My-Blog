import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

import { getRoles } from "../../services/userService";

function Roles() {
    let getAll = getRoles().catch((err) => { console.log(err) });
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        getAll.then((res) => {
            //console.log(res?.result.items);
            setRoles(res?.result.items);
        });
    }, []);

    return (
        <Table responsive>
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
    );
}

export default Roles;
