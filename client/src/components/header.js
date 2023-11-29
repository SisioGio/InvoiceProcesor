import { useState, useEffect } from "react";
import axios from "axios";
function Header() {
  return (
    <header>
      <nav class="navbar navbar-expand-lg ">
        <div class="container-fluid d-flex justify-content-center">
          <a class="navbar-brand" href="#">
            Invoice Processor Hub
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Header;
