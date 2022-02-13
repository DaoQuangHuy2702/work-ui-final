import React from 'react';
import { Layout } from 'antd';
import SideBar from '../components/common/sidebar/SideBar';
import WorkList from '../components/work/worklist/WorkList';

const { Content } = Layout;

const WorkPage = () => {
    return(
        <div className="work-page">
            <Layout className="layout">
                <SideBar/>
                <Content className="content">
                    <WorkList/>
                </Content>
            </Layout>
        </div>
    )
}

export default WorkPage;