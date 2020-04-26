import React from "react";
import "./Dashboard.scss";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Paper } from "@material-ui/core";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import StoreIcon from "@material-ui/icons/Store";
import PersonIcon from "@material-ui/icons/Person";

const Dashboard = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
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
            <h1>المنتجات</h1>
          </div>
        );

      case 2:
        return (
          <div className="products">
            <h1>إدارة الحساب</h1>
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
        </Tabs>
        <Paper className="tabContent">{tabContent(value)}</Paper>
      </div>
    </div>
  );
};

export default Dashboard;
