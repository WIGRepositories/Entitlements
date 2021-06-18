using Entitlements.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Entitlements.Controllers
{
    public class MasterDataGroupsController : ApiController
    {
        [HttpGet]
        [Route("api/MasterDataGroups/GetMasterDataGroups")]
        public DataTable GetMasterDataGroups()
        {

            DataTable dt = new DataTable();
            SqlConnection con = new SqlConnection();

            try
            {

                con.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["btposdb"].ToString();               

                //DataRow dr = dt.NewRow();
                //dr["test"] = "test";
                //dt.Rows.Add(dr);
                //return dt;
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "getTypeGroups";



                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);

            }
            catch (Exception ex)
            {
                //DataRow dr = dt.NewRow();
                //dr["test"] = ex.Message;
                //dt.Rows.Add(dr);
                //return dt;
                throw ex;
            }


            return dt;
        }

        [HttpGet]
        [Route("api/MasterDataGroups/GetMasterDataGroupspaging")]
        public DataSet GetMasterDataGroupspaging(int curpage, int maxrows)
        {

            DataSet dt = new DataSet();
            SqlConnection con = new SqlConnection();

            try
            {

                con.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["btposdb"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetMasterDataGroupspaging";
                con.Open();


                SqlParameter cur = new SqlParameter("@curpage", SqlDbType.Int);
                cur.Value = curpage;
                cmd.Parameters.Add(cur);


                SqlParameter max = new SqlParameter("@maxrows", SqlDbType.Int);
                max.Value = maxrows;
                cmd.Parameters.Add(max);


                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);

            }
            catch (Exception ex)
            {

                throw ex;
            }


            return dt;
        }

        [HttpPost]
        [Route("api/MasterDataGroups/InsUpDelMasterDataGroups")]
        public DataTable InsUpDelMasterDataGroups(MasterDataGroups m)
        {
            DataTable dt1 = new DataTable();
            SqlConnection con = new SqlConnection();
            try
            {

                con.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["btposdb"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "InsUpdTypeGroups";

                SqlParameter fa = new SqlParameter("@flag", SqlDbType.VarChar, 10);
                fa.Value = m.flag;
                cmd.Parameters.Add(fa);

                SqlParameter id = new SqlParameter("@Id", SqlDbType.Int);
                id.Value = m.Id;
                cmd.Parameters.Add(id);

                SqlParameter nam = new SqlParameter("@Name", SqlDbType.VarChar, 50);
                nam.Value = m.Name;
                cmd.Parameters.Add(nam);

                SqlParameter des = new SqlParameter("@Description", SqlDbType.VarChar, 50);
                des.Value = m.Description;
                cmd.Parameters.Add(des);

                SqlParameter ac = new SqlParameter("@Active", SqlDbType.Int);
                ac.Value = m.Active;
                cmd.Parameters.Add(ac);

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt1);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return dt1;


        }

       

        [HttpGet]
        [Route("api/MasterDataGroups/GetMasterDataTypespaging")]
        public DataSet GetMasterDataTypespaging(int curpage, int maxrows, int TypeId)
        {

            DataSet dt = new DataSet();
            SqlConnection con = new SqlConnection();

            try
            {

                con.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["btposdb"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;
                con.Open();

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetMasterDataTypespaging";

                SqlParameter cur = new SqlParameter("@curpage", SqlDbType.Int);
                cur.Value = curpage;
                cmd.Parameters.Add(cur);


                SqlParameter max = new SqlParameter("@maxrows", SqlDbType.Int);
                max.Value = maxrows;
                cmd.Parameters.Add(max);

                SqlParameter type = new SqlParameter("@TypeId", SqlDbType.Int);
                type.Value = TypeId;
                cmd.Parameters.Add(type);


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
        [Route("api/MasterDataGroups/GetDataTypesByGroupId")]
        public DataTable GetDataTypesByGroupId(int grpid)
        {

            DataTable dt = new DataTable();
            SqlConnection con = new SqlConnection();

            try
            {

                con.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["btposdb"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetTypesByGroupId";

                SqlParameter id = new SqlParameter("@typegrpid", SqlDbType.Int);
                id.Value = grpid;
                cmd.Parameters.Add(id);

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);

            }
            catch (Exception ex)
            {
                throw ex;
            }


            return dt;
        }

        [HttpPost]
        [Route("api/MasterDataGroups/InSUpDMasterDataTypes")]
        public DataTable InSUpDMasterDataTypes(MasterDatatypes m1)
        {
            DataTable dt1 = new DataTable();
            SqlConnection con = new SqlConnection();
            try
            {

                con.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["btposdb"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;

                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "InsUpdTypes";



                SqlParameter id = new SqlParameter("@Id", SqlDbType.Int);
                id.Value = m1.Id;
                cmd.Parameters.Add(id);

                SqlParameter nam = new SqlParameter("@Name", SqlDbType.VarChar, 50);
                nam.Value = m1.Name;
                cmd.Parameters.Add(nam);

                SqlParameter des = new SqlParameter("@Description", SqlDbType.VarChar, 50);
                des.Value = m1.Description;
                cmd.Parameters.Add(des);

                SqlParameter ac = new SqlParameter("@Active", SqlDbType.Int);
                ac.Value = m1.Active;
                cmd.Parameters.Add(ac);

                SqlParameter t = new SqlParameter("@TypeGroupId", SqlDbType.Int);
                t.Value = m1.TypeGroupId;
                cmd.Parameters.Add(t);

                //SqlParameter l = new SqlParameter("@listkey", SqlDbType.VarChar, 10);
                //l.Value = m1.listkey;
                //cmd.Parameters.Add(l);

                //SqlParameter lv = new SqlParameter("@listvalue", SqlDbType.VarChar, 20);
                //lv.Value = m1.listvalue;
                //cmd.Parameters.Add(lv);

                SqlParameter fa = new SqlParameter("@flag", SqlDbType.VarChar, 10);
                fa.Value = m1.flag;
                cmd.Parameters.Add(fa);


                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt1);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return dt1;


        }

    }
}
