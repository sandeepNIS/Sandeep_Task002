import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import AccountTableRow from "./AccountTableRow";

const AccountList = () => {
const [accounts, setAccounts] = useState([]);

useEffect(() => {
	axios
	.get("http://localhost:5000/account/list")
	.then(({ data }) => {
		setAccounts(data);
	})
	.catch((error) => {
		console.log(error);
	});
}, []);

const DataTable = () => {
	return accounts.map((res, i) => {
	return <AccountTableRow obj={res} key={i} />;
	});
};

return (
	<div className="table-wrapper">
	<Table striped bordered hover>
		<thead>
		<tr>
			<th>Name</th>
			<th>Email</th>
			<th>Action</th>
		</tr>
		</thead>
		<tbody>{DataTable()}</tbody>
	</Table>
	</div>
);
};

export default AccountList;
