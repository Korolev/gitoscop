describe("Repository linking case of app", function() {

    var repoLinkageButton;

    beforeEach(function() {
        repoLinkageButton = using(
            'div[ng-controller="RepoLinkageController"]',
            "Repo linkage controler"
        ).element('input[type="button"]');

    });


    it("should take repo URL from hash", function() {
        browser().navigateTo("/index.html#https://api.github.com/repos/e2e/test");
        expect(binding('repo.url')).toEqual('https://api.github.com/repos/e2e/test');
        expect(binding('repo.apiUrl')).toEqual('https://api.github.com/repos/e2e/test');

        expect(repoLinkageButton.attr('disabled')).toBeFalsy();
    });

    it("should open the page and download repo information", function() {
        browser().navigateTo("/index.html");

        expect(repoLinkageButton.attr('disabled')).toBeTruthy();

        input("repo.url").enter("https://github.com/e2e/test");
        expect(binding('repo.url')).toEqual('https://github.com/e2e/test');
        expect(binding('repo.apiUrl')).toEqual('https://api.github.com/repos/e2e/test');

        expect(repoLinkageButton.attr('disabled')).toBeFalsy();

        repoLinkageButton.click();

        expect(repeater(".commits ul", "List of commits").count()).toEqual(2);

        expect(using('.commits ul', "List of commits").element("a:first").text()).toEqual("15c1fe392942b70e456f10afbdfd9c3329249a43");
    });

});