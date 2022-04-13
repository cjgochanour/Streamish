import React, { useState } from "react";
import { Form, Input, Label, Button } from "reactstrap";
import { searchVideo } from "../modules/videoManager.js";

export const Search = ({ stateSetter }) => {
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState(false);

    const makeSearchHappen = () => {
        searchVideo(query, sort).then((videos) => stateSetter(videos));
        setQuery("");
    };

    return (
        <Form>
            <Label for="searchQuery">Search: </Label>
            <Input type="search" name="searchQuery" onChange={(e) => setQuery(e.target.value)} />
            <Label for="sortDescending">Sort Descending </Label>
            <Input type="checkbox" name="sortDescending" onChange={(e) => setSort(e.target.checked)} />
            <Button onClick={(e) => makeSearchHappen()}>Search</Button>
        </Form>
    );
};

export default Search;
