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
    public class ObjectsController : ApiController
    {
        [HttpGet]
        public DataTable getObjects(int objid)
        {
            DataTable Tbl = new DataTable();

            LogTraceWriter traceWriter = new LogTraceWriter();
            traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "getObjects credentials....");
 
            //connect to database
            SqlConnection conn = new SqlConnection();
            //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
            conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["btposdb"].ToString();

            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "getObjects";
            cmd.Connection = conn;

            cmd.Parameters.Add("@objid", SqlDbType.Int).Value = objid;

            DataSet ds = new DataSet();
            SqlDataAdapter db = new SqlDataAdapter(cmd);
            db.Fill(ds);
            Tbl = ds.Tables[0];
            traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "getObjects Credentials completed.");
            // int found = 0;
            return Tbl;
        }

        [HttpGet]
        public DataTable GetApplications()
        {
            DataTable Tbl = new DataTable();
            SqlConnection conn = new SqlConnection();
            LogTraceWriter traceWriter = new LogTraceWriter();

            try
            {
                traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "getApplications input....");

                //connect to database
               
                //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
                conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["btposdb"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "getApplications";
                cmd.Connection = conn;
              
                SqlDataAdapter db = new SqlDataAdapter(cmd);
                db.Fill(Tbl);
               
                traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "getApplications Output Success.");
            }
            catch (Exception ex)
            {
                throw ex;
            }
            
            // int found = 0;
            return Tbl;
        }


        [HttpPost]
        public HttpResponseMessage saveObjects(Objects b)
        {

            LogTraceWriter traceWriter = new LogTraceWriter();
            traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "saveObjects credentials....");
 
            //connect to database
            SqlConnection conn = new SqlConnection();
            try
            { 
            //connetionString="Data Source=ServerName;Initial Catalog=DatabaseName;User ID=UserName;Password=Password"
            conn.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["btposdb"].ToString();

            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "InsUpdDelObjects";
            cmd.Connection = conn;
            conn.Open();

            SqlParameter cc = new SqlParameter();
            cc.ParameterName = "@Id";
            cc.SqlDbType = SqlDbType.Int;
            cc.Value = b.Id;
            cmd.Parameters.Add(cc);

            SqlParameter cname = new SqlParameter();
            cname.ParameterName = "@Name";
            cname.SqlDbType = SqlDbType.VarChar;
            cname.Value = b.Name;
            cmd.Parameters.Add(cname);

            SqlParameter dd = new SqlParameter();
            dd.ParameterName = "@Description";
            dd.SqlDbType = SqlDbType.VarChar;
            dd.Value = b.Description;
            cmd.Parameters.Add(dd);

            //SqlParameter dda = new SqlParameter();
            //dda.ParameterName = "@Path";
            //dda.SqlDbType = SqlDbType.VarChar;
            //dda.Value = b.Path;
            //cmd.Parameters.Add(dda);

           

            SqlParameter fd = new SqlParameter();
            fd.ParameterName = "@ParentId";
            fd.SqlDbType = SqlDbType.Int;
            fd.Value = b.ParentId;
            cmd.Parameters.Add(fd);

            SqlParameter gd = new SqlParameter();
            gd.ParameterName = "@RootObjectId";
            gd.SqlDbType = SqlDbType.Int;
            gd.Value = b.RootObjectId;
            cmd.Parameters.Add(gd);

          


            SqlParameter aa = new SqlParameter();
            aa.ParameterName = "@Active";
            aa.SqlDbType = SqlDbType.VarChar;
            aa.Value = b.Active;
            cmd.Parameters.Add(aa);

            SqlParameter flag = new SqlParameter();
            flag.ParameterName = "@insupdflag";
            flag.SqlDbType = SqlDbType.VarChar;
            flag.Value = b.insupdflag;
            //llid.Value = b.Active;
            cmd.Parameters.Add(flag);
           


            //DataSet ds = new DataSet();
            //SqlDataAdapter db = new SqlDataAdapter(cmd);
            //db.Fill(ds);
            // Tbl = Tables[0];
            cmd.ExecuteScalar();
            conn.Close();
            traceWriter.Trace(Request, "0", TraceLevel.Info, "{0}", "saveObjects Credentials completed.");
            return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                if (conn != null && conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
                string str = ex.Message;
                traceWriter.Trace(Request, "1", TraceLevel.Info, "{0}", "Error in saveObjects:" + ex.Message);
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }
        }
        public void Options()
        {

        }
    }
}

