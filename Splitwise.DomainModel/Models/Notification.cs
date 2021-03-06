﻿    using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Splitwise.DomainModel.Models.ApplicationClasses
{
    public class Notification
    {
        [Key]
        public string Id { get; set; }
        public string Payload { get; set; }
        public string UserId { get; set; }
        public string Detail { get; set; }
        public string Email {get; set; }
        public string NotificationOn { get; set; }
        public string NotificationOnId { get; set; }
        public string Severity { get; set; }
    }
}
