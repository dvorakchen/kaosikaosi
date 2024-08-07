using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace kaosikaosi.Extensions;

public static class StateModelExtensions
{
    public static string FlatErrorMessage(this ModelStateDictionary modelState)
    {
        return string.Join(", ", modelState
            .Where(err => err.Value != null)
            .Select(err => string.Join(", ",
                err.Value!.Errors
                .Select(error => error.ErrorMessage)
                .Distinct())));
    }
}
