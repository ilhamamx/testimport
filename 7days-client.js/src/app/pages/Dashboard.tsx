import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Button from "../../styles/components/Button";
import * as Log from "../../util/SDayslogger";

export function Dashboard() {
  console.log("this is dashboard");
  const nav = useNavigate();
  async function error() {
    const axios = await require("axios").default;
    try {
      const response = await axios.get(
        "http://localhost:3000/auth/reset-password"
      );
      console.log(response);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // handleAxiosError(error);
        console.log("error" + err);
        Log.SDayslogger(
          nav,
          "Testing Error Message",
          Log.SDLOGGER_INFO,
          false,
          true
        );
      } else {
        // handleUnexpectedError(error);
        console.log("error2" + error);
      }
    }
  }

  return (
      <div>
        <h1>Dashboard page</h1>
        <br></br>
        <br></br>
        <Link
          to="/auth/reset-password?token=error123456"
          className="btn btn-lg btn-primary fw-bolder"
          data-testid="error500"
        >
          Test erorr 500
        </Link>
        <br></br>
        <br></br>
        <Button
          id="btnError"
          className="btn btn-lg btn-primary fw-bolder"
          onClick={async () => {
            error();
          }}
        >
          Test Error 500 Sentry
        </Button>
        
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu ligula interdum lorem tincidunt commodo et vitae libero. Donec orci magna, vestibulum id ullamcorper id, varius sed massa. Quisque sodales quam rhoncus auctor vestibulum. Aenean tincidunt vitae neque ut eleifend. Nam eleifend fringilla lacus, ac tristique massa iaculis at. Mauris gravida leo in est blandit convallis. Aliquam pretium sem sit amet vulputate tristique. Nullam tempor ante et metus convallis, vel aliquet augue commodo. Curabitur congue erat id massa sagittis, et congue sem luctus. Curabitur rhoncus felis eget lectus faucibus congue. Pellentesque est nisl, porta et vulputate in, imperdiet sit amet orci. Morbi neque tortor, venenatis pulvinar placerat et, eleifend in purus. Vestibulum mollis molestie erat. Nam magna quam, pellentesque iaculis consequat ut, tincidunt ut ex.
</p>
<p>Vivamus felis neque, condimentum ut mi et, consectetur placerat purus. Nullam volutpat porta maximus. Donec eu sollicitudin dui. Nam molestie cursus consequat. Curabitur porta posuere tellus, non finibus purus molestie id. Quisque vulputate rhoncus efficitur. Aliquam erat volutpat. Fusce convallis et libero pharetra euismod. Aliquam posuere pretium nisi, rutrum commodo tellus auctor sit amet. Aenean tristique, erat eget sagittis pulvinar, nulla mi fringilla tortor, vel pretium purus urna eget quam. Fusce dictum id nunc sed aliquet. Integer lacus odio, ultrices et suscipit semper, fermentum eu lorem. Aenean hendrerit risus lacus, ut sollicitudin ante fermentum eget. Quisque finibus volutpat sagittis.
</p>
<p>Suspendisse ut tellus blandit, feugiat tortor et, facilisis dolor. Ut dolor dolor, rhoncus id tempor nec, interdum at arcu. Vivamus scelerisque aliquam efficitur. Nunc ligula augue, sagittis eu nisl sed, pulvinar malesuada ligula. Aenean auctor sapien in magna gravida tincidunt. Vivamus at faucibus sapien. Nam cursus, orci vel congue cursus, magna ipsum mattis lacus, at sodales mauris nisl vitae enim.
</p>
<p>Phasellus ut vulputate libero, non commodo metus. Curabitur est sapien, mollis quis massa eget, consectetur imperdiet leo. Nam a metus eleifend, dignissim odio vel, rutrum neque. Vestibulum gravida commodo odio vel mattis. Vestibulum ultricies risus nisi, nec egestas massa ornare sit amet. Sed euismod elit elementum, ultrices ipsum vitae, accumsan neque. Integer dapibus consectetur velit, et ultricies diam suscipit sed. Phasellus finibus mauris et diam lobortis varius. Duis vulputate aliquet turpis, in ultricies metus placerat at. Aenean tempor lobortis augue. Nulla facilisi. Morbi condimentum tincidunt elit eu pharetra. Nullam eleifend, libero nec luctus tincidunt, velit mi blandit justo, sit amet suscipit tellus nisl eget felis. Nullam odio dui, maximus a vulputate ac, congue at arcu. Integer viverra enim vel sapien faucibus, quis pulvinar magna ornare.
</p>
      </div>
  );
}
