<template>
       <div class="col-md-2" id="sidebar">
            <hr>
            <img src="https://www.clipartmax.com/png/middle/171-1717870_stockvader-predicted-cron-for-may-user-profile-icon-png.png" alt="..." style="width:100px; height: 100px; " class="rounded-circle ml-5">
                <nav class="navbar navbar-expand navbar-dark flex-md-column flex-row align-items-start py-2">
                    <div class="collapse navbar-collapse">
                        <ul class="flex-md-column flex-row navbar-nav w-100 justify-content-between">
                            <li class="nav-item ">
                                <router-link to="/dashboard">
                                <a class="nav-link pl-0 text-nowrap text-dark"><i><span class="font-weight-bold ml-4">Dashboard</span></i></a>
                                </router-link>
                                <hr>
                            </li>
                            <li class="nav-item">
                                <router-link to="/dashboard/product">
                                <a class="nav-link pl-0 text-nowrap text-dark"><i class="fa fa-bullseye fa-fw"></i>
                                <span class="font-weight-bold" >Product</span></a>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/dashboard/category">
                                <a class="nav-link pl-0 text-dark" ><i class="fa fa-list fa-fw" ></i> <span class="d-none d-md-inline">Category</span></a>
                                 </router-link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
</template>
