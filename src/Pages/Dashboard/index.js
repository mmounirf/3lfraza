import React from "react";
import "./Dashboard.scss";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Paper, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import StoreIcon from "@material-ui/icons/Store";
import PersonIcon from "@material-ui/icons/Person";
import { CreateProduct } from "../../Components";
import Firebase from "../../Config/Firebase";
import { Message, Money } from "@material-ui/icons";

const Dashboard = () => {
  const [value, setValue] = React.useState(0);
  const [products, setProducts] = React.useState([]);
  const [openCreateProduct, setOpenCreateProduct] = React.useState(false);
  const getData = () => {
    Firebase.firestore()
      .collection("products")
      .get()
      .then((snapshot) => {
        setProducts(
          snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );
      });
  };
  const handleChange = (event, newValue) => {
    if (newValue === 1 && products.length === 0) {
      getData();
    }
    setValue(newValue);
  };

  const tabContent = (index) => {
    switch (index) {
      case 0:
        return (
          <div className="store">
            <h1>المتجر</h1>
          </div>
        );

      case 1:
        return (
          <div className="products">
            <div className="header">

            <h1>المنتجات</h1>
            <Button onClick={() => setOpenCreateProduct(true)} variant="contained" color="primary" disableElevation>
              إضافة منتج
            </Button>
            </div>
            <CreateProduct open={openCreateProduct} handleClose={() => setOpenCreateProduct(false)} refreshProducts={() => getData()}/>
            {value === 1 && (
              <TableContainer>
                <Table className="productsTable">
                  <TableHead className="tableHeader">
                    <TableRow>
                      <TableCell align="right">الصورة</TableCell>
                      <TableCell align="right">الأسم</TableCell>
                      <TableCell align="right">التصنيف</TableCell>
                      <TableCell align="right">السعر</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell align="right" className="productImg">
                          <img width="50" src={row.img} alt="product-img" />
                        </TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.category.name}</TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
        );

      case 2:
        return (
          <div className="products">
            <h1>إدارة الحساب</h1>
          </div>
        );

        case 3:
          return (
            <div className="messages">
              <h1>الرسائل</h1>
            </div>
          );

          case 4:
            return (
              <div className="messages">
                <h1>المكسب</h1>
              </div>
            );

      default:
        break;
    }
  };

  return (
    <div className="dashboard">
      <div className="container">
        <Tabs className="tabs" orientation="vertical" variant="scrollable" value={value} onChange={handleChange}>
          <Tab className="tab" label="المتجر" icon={<StoreIcon />} />
          <Tab className="tab" label="المنتجات" icon={<ShoppingBasketIcon />} />
          <Tab className="tab" label="إدارة الحساب" icon={<PersonIcon />} />
          <Tab className="tab" label="الرسائل" icon={<Message />} />
          <Tab className="tab" label="المكسب" icon={<Money />} />

        </Tabs>
        <Paper className="tabContent">{tabContent(value)}</Paper>
      </div>
    </div>
  );
};

export default Dashboard;
