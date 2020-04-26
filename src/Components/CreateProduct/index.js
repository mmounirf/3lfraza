import React from "react";
import "./CreateProduct.scss";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { CategoriesAutocomplete } from "..";
import Firebase from "../../Config/Firebase";
import { Save, Cancel } from "@material-ui/icons";

const CreateProduct = (props) => {
  const fileUpload = React.createRef();
  const [img, setImg] = React.useState('')

  const [form, setForm] = React.useState({name: '', price: '', category: '', img: ''})
  const onCategoriesAutocompleteChange = category => {
    setForm({...form, category})
  }
  const onInputChange = e => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const closeDialog = () => {
    props.handleClose();
    setImg('');
    setForm({name: '', price: '', category: '', img: ''})
  }

  const addProduct = () => {
    Firebase.firestore().collection('products').add(form).then((resp) => {
      closeDialog();
    })
  }

  const fileInputClick = (e) => {
    fileUpload.current.click();
  }

  const fileSelect = (e) => {
    const file = e.target.files[0];
    const preview = URL.createObjectURL(file);
    const img = new Image();
    img.src = preview;
    img.onload = () => {
      setImg(preview)
    }
  }

  return (
    <div className="createProduct">
      <input accept="image/*" ref={fileUpload} type="file" style={{visibility: 'hidden'}} onChange={fileSelect} />
      <Dialog className="dialog" fullWidth open={props.open} onClose={closeDialog}>
        <DialogTitle id="form-dialog-title">إضافة منتج</DialogTitle>
        <DialogContent className="dialogContent">
          <div className="inputs">
          <TextField onChange={onInputChange} name="name" value={form.name} autoFocus margin="normal" label="الأسم" variant="outlined" fullWidth />
          <TextField onChange={onInputChange} name="price" value={form.price} type="number" margin="normal" label="السعر" variant="outlined" fullWidth />
          <CategoriesAutocomplete
            placeholder="اختر تصنيف المنتج"
            onChange={onCategoriesAutocompleteChange}
            selected={form.category}
          />
          </div>
          <div className="fileUpload" onClick={fileInputClick} style={{backgroundImage: `url(${img})`}}>
            <div className="fileUpload__container">
  {img.length === 0 && <h3>اضغط هنا لأختيار صورة المنتج</h3> }
            </div>
          </div>
        </DialogContent>
        <DialogActions>
        <Button variant="outlined" fullWidth onClick={addProduct} color="primary" disableElevation>
            <Save /> اضافة المنتج
          </Button>
          <Button variant="outlined" fullWidth onClick={closeDialog} color="primary">
            <Cancel /> إلغاء
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateProduct;
