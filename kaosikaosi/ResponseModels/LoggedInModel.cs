﻿namespace kaosikaosi.ResponseModels
{
    public record LoggedInModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = "";
        public string Email { get; set; } = "";
        public string Profile { get; set; } = "";
    }
}
