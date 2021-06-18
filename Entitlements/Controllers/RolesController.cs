using Entitlements.App_Start;
using Entitlements.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Tracing;

namespace Entitlements.Controllers
{
    public class RolesController : ApiController
    {
        [HttpGet]
        [Route("api/Roles/GetRoles")]
        public DataTable GetRoles()
        {

            DataTable dt = new DataTable();
            SqlConnection con = new SqlConnection();

            try
            {

                con.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["btposdb"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[dbo].[GetRoles]";



                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);

            }
            catch (Exception ex)
            {
                throw ex;
            }


            return dt;
        }

        [HttpGet]
        [Route("api/Roles/GetRoleDetails")]
        public DataSet GetRoleDetails(int roleId,int appid)
        {
            LogTraceWriter traceWriter = new LogTraceWriter();
            traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "getroledetails credentials....");


            //connect to database
            SqlConnection conn = new SqlConnection();
            //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
            conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["btposdb"].ToString();

            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "getRoledetails";
            cmd.Connection = conn;

            SqlParameter Aid = new SqlParameter("@roleId", SqlDbType.Int);
            Aid.Value = roleId;
            cmd.Parameters.Add(Aid);

            cmd.Parameters.Add("@aid", SqlDbType.Int).Value = appid;

            DataSet ds = new DataSet();
            SqlDataAdapter db = new SqlDataAdapter(cmd);
            db.Fill(ds);


            traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "getroledetails Credentials completed.");
            // int found = 0;
            return ds;
        }

        [HttpPost]
        [Route("api/Roles/InsUpDelroles")]
        public DataTable InsUpdDelRoles(Roles nam)
        {

            DataTable dt = new DataTable();
            SqlConnection con = new SqlConnection();

            try
            {

                con.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["btposdb"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "InsUpdDelRoles";

                SqlParameter flg = new SqlParameter("@flag", SqlDbType.VarChar);
                flg.Value = nam.flag;
                cmd.Parameters.Add(flg);

                SqlParameter q = new SqlParameter("@Id", SqlDbType.Int);
                q.Value = nam.Id;
                cmd.Parameters.Add(q);

                SqlParameter a = new SqlParameter("@Name", SqlDbType.VarChar, 50);
                a.Value = nam.Name;
                cmd.Parameters.Add(a);

                SqlParameter cn = new SqlParameter("@Description", SqlDbType.VarChar, 50);
                cn.Value = nam.Description;
                cmd.Parameters.Add(cn);

                SqlParameter cb = new SqlParameter("@Active", SqlDbType.Int);
                cb.Value = nam.Active;
                cmd.Parameters.Add(cb);

                SqlParameter at = new SqlParameter("@IsPublic", SqlDbType.Int);
                at.Value = nam.IsPublic;
                cmd.Parameters.Add(at);

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);

            }
            catch (Exception ex)
            {
                throw ex;
            }


            return dt;
        }
    }
}
