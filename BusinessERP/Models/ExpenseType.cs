﻿using System;

namespace BusinessERP.Models
{
    public class ExpenseType : EntityBase
    {
        public Int64 Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
