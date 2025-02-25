import React from "react"
import { SideBar, UsersAndGroupsList, MessagesRoom } from "../../../features/"
import Layout from "../layout/layout"

export const ChatsPage = () => {

    return (
        <Layout>
            <SideBar />
            <UsersAndGroupsList />
            <MessagesRoom />
        </Layout>
    )
}