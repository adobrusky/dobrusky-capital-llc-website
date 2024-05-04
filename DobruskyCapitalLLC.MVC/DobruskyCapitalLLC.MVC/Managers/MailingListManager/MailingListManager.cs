using System.Data.SqlClient;
using DobruskyCapitalLLC.MVC.DataModels;

namespace DobruskyCapitalLLC.MVC.Managers.MailingListManager
{
    public class MailingListManager
    {
        private readonly string _connectionString;

        public MailingListManager(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DobruskyCapitalLLC"); 
        }

        public bool AddEmailRecord(string email)
        {
            try
            {
                using SqlConnection connection = new(_connectionString);
                connection.Open();
                string sql = "INSERT INTO MailingList (Email) VALUES (@Email)";
                using SqlCommand command = new(sql, connection);
                command.Parameters.AddWithValue("@Email", email);
                int result = command.ExecuteNonQuery();
                return result > 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public MailingListEmail? GetEmailRecordByEmail(string email)
        {
            try
            {
                using SqlConnection connection = new(_connectionString);
                connection.Open();
                string sql = "SELECT emailID, email FROM mailinglist WHERE email = @Email";
                using SqlCommand command = new(sql, connection);
                command.Parameters.AddWithValue("@Email", email);
                using SqlDataReader reader = command.ExecuteReader();
                if (reader.Read())
                {
                    return new MailingListEmail
                    {
                        EmailID = reader.GetInt32(reader.GetOrdinal("emailID")),
                        Email = reader.GetString(reader.GetOrdinal("email"))
                    };
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }
    }
}
