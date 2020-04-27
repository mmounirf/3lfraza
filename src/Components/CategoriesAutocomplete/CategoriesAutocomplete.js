import React, { useState, useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, CircularProgress } from "@material-ui/core";
import { useDispatch } from "react-redux";
import match from "./match";
import parse from "./parse";
import Firebase from "../../Config/Firebase";
import { loadCategories } from "../../Redux/actions";

const CategoriesAutocomplete = props => {
  const [listOpen, setListOpen] = useState(false);
  const [categoriesList, setCategoriesList] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = useState(props.selected ? props.selected : {});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const optionSelected = value => {
    setSelectedCategory(value);
    props.onChange(value);
  };

  useEffect(() => {
    if(props.selected && props.selected.id) {
      setSelectedCategory(props.selected);
      props.onChange(props.selected);
      setLoading(false)
    }
    // eslint-disable-next-line
  }, [props.selected])

  const getCategories = () => {
    setLoading(true)
    Firebase.firestore().collection('categories').get().then((snapshot) => {
      const data = snapshot.docs.map(doc => doc.data());
      dispatch(loadCategories(data));
      setCategoriesList(data);
      setLoading(false);
    })
  };
  return (
    <Autocomplete
      className="category-select"
      open={listOpen}
      onOpen={(e) => {
        setListOpen(true);
        setLoading(true);
        getCategories()
      }}
      onClose={() => {
        setListOpen(false);
      }}
      onChange={(e, value) => {
        optionSelected(value);
      }}
      onInputChange={(e, value) => {
        setLoading(true);
      }}
      getOptionSelected={(option, value) => option.id === value.id}
      getOptionLabel={option => option.name}
      value={selectedCategory.id ? selectedCategory : null}
      options={categoriesList}
      loading={loading}
      autoHighlight
      autoComplete
      disableClearable
      renderOption={(option, { inputValue }) => {
        const matches = match(option.name, inputValue);
        const parts = parse(option.name, matches);

        return (
          <div>
            {parts.map((part, index) => (
              <span key={index} style={{ fontWeight: part.highlight ? 700 : 400, color: part.highlight ? '#0064fe' : '#000' }}>
                {part.text}
              </span>
            ))}
          </div>
        );
      }}
      renderInput={params => (
        <TextField
          margin="normal"
          {...params}
          label={`${props.placeholder ? props.placeholder : 'Select Category'}`}
          fullWidth
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="primary" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  );
};

export default CategoriesAutocomplete;
