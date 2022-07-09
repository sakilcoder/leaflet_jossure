var placeholder = "Select One";
$(".select2, .select2-multiple").select2({ placeholder: placeholder });
$(".select2-allow-clear").select2({ allowClear: true, placeholder: placeholder });

// @see https://github.com/ivaynberg/select2/commit/6661e3
function repoFormatResult(repo) {
    var markup = "<div class='select2-result-repository clearfix'>" +
        "<div class='select2-result-repository__avatar'><img src='" + repo.owner.avatar_url + "' /></div>" +
        "<div class='select2-result-repository__meta'>" +
        "<div class='select2-result-repository__title'>" + repo.full_name + "</div>";

    if (repo.description) {
        markup += "<div class='select2-result-repository__description'>" + repo.description + "</div>";
    }

    markup += "<div class='select2-result-repository__statistics'>" +
        "<div class='select2-result-repository__forks'><span class='glyphicon glyphicon-flash'></span> " + repo.forks_count + " Forks</div>" +
        "<div class='select2-result-repository__stargazers'><span class='glyphicon glyphicon-star'></span> " + repo.stargazers_count + " Stars</div>" +
        "<div class='select2-result-repository__watchers'><span class='glyphicon glyphicon-eye-open'></span> " + repo.watchers_count + " Watchers</div>" +
        "</div>" +
        "</div></div>";

    return markup;
}

function repoFormatSelection(repo) {
    return repo.full_name;
}