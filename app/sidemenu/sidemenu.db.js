import { pool } from "../connection/sql.connect.js";
import sql from "mssql";

const getDefaultRoute = async (role) => {
    try {
        const query = `
        SELECT DISTINCT 
            sm.[nav_id]
            ,sm.[nav_path]
            ,sm.[nav_title]
            ,sm.[nav_icon]
            ,sm.[is_active]
            ,sm.[nav_parent_id]
            ,sm.[is_submenu]
        FROM dbo.tbl_sidemenu sm
        JOIN dbo.tbl_sidemenu_roles smr ON sm.nav_id = smr.nav_id
        JOIN dbo.tbl_roles r ON smr.role_id = r.role_id
        WHERE r.role_name = @role AND sm.nav_id = 1 AND sm.is_active=1; 
      `;
        const request = pool.request().input("role", sql.NVarChar, role);
        const result = await request.query(query);
        return result.recordset[0];
    } catch (error) {
        throw error;
    }
};

const getAllRoutes = async (role) => {
    try {
        const query = `
        SELECT DISTINCT
            sm.[nav_id]
            ,sm.[nav_path]
            ,sm.[nav_title]
            ,sm.[nav_icon]
            ,sm.[is_active]
            ,sm.[nav_parent_id]
            ,sm.[is_submenu]
        FROM dbo.tbl_sidemenu sm
        JOIN dbo.tbl_sidemenu_roles smr ON sm.nav_id = smr.nav_id
        JOIN dbo.tbl_roles r ON smr.role_id = r.role_id
        WHERE r.role_name = @role AND sm.is_active=1;
      `;
        const request = pool.request().input("role", sql.NVarChar, role);
        const result = await request.query(query);
        return result.recordset;
    } catch (error) {
        throw error;
    }
};

export default {
    getDefaultRoute,
    getAllRoutes,
};
