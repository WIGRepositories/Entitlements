using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Entitlements.Models
{
    public class Objects
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public int ParentId { get; set; }

        public int RootObjectId { get; set; }

        public string Path { get; set; }
        public int Active { get; set; }
        public string insupdflag { get; set; }
        public int ApplicationId { get; set; }

    }

    public class applications
    {
        public int Id { get; set; }
        public int CreatedBy { get; set; }
        public int Active { get; set; }
        public int UpdatedBy { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string flag { get; set; }

    }

    public class UserLogin
    {
        public int Id { set; get; }
        public int UserId { set; get; }
        public string LoginInfo { set; get; }
        public string Passkey { set; get; }
        public string Salt { set; get; }
        public string Active { set; get; }

    }
    public class MasterDataGroups
    {
        public string flag { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Active { get; set; }
    }
    public class MasterDatatypes
    {
        public string flag { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Active { get; set; }
        public int TypeGroupId { get; set; }
        public string listkey { get; set; }
        public string listvalue { get; set; }
    }

    public class Roles
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Active { get; set; }
        public int IsPublic { get; set; }
        public string flag { get; set; }

    }

    public class roleobjects
    {
        public int Id { get; set; }
        public int RoleId { get; set; }
        public int objectId { get; set; }
        public int TypeId { get; set; }       
        public string flag { get; set; }
    }
}