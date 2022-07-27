import * as React from "react";
import { Pane, Spinner } from "evergreen-ui";

("use strict");

export default function Loading() {
  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="center"
      height={400}
    >
      <Spinner />
    </Pane>
  );
}
