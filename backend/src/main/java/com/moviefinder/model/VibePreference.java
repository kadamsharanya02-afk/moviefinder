package com.moviefinder.model;

public class VibePreference {

    private int horror;
    private int romance;
    private int thriller;
    private int comedy;
    private int drama;
    private int action;
    private int mystery;
    private int violence;
    private int darkness;

    public VibePreference() {
        this.horror = 50;
        this.romance = 50;
        this.thriller = 50;
        this.comedy = 50;
        this.drama = 50;
        this.action = 50;
        this.mystery = 50;
        this.violence = 50;
        this.darkness = 50;
    }

    public VibePreference(int horror, int romance, int thriller, int comedy, int drama,
                          int action, int mystery, int violence, int darkness) {
        this.horror = clamp(horror);
        this.romance = clamp(romance);
        this.thriller = clamp(thriller);
        this.comedy = clamp(comedy);
        this.drama = clamp(drama);
        this.action = clamp(action);
        this.mystery = clamp(mystery);
        this.violence = clamp(violence);
        this.darkness = clamp(darkness);
    }

    public static int clamp(int val) {
        if (val < 0) return 0;
        if (val > 100) return 100;
        return val;
    }

    public int getHorror() { return horror; }
    public void setHorror(int horror) { this.horror = clamp(horror); }

    public int getRomance() { return romance; }
    public void setRomance(int romance) { this.romance = clamp(romance); }

    public int getThriller() { return thriller; }
    public void setThriller(int thriller) { this.thriller = clamp(thriller); }

    public int getComedy() { return comedy; }
    public void setComedy(int comedy) { this.comedy = clamp(comedy); }

    public int getDrama() { return drama; }
    public void setDrama(int drama) { this.drama = clamp(drama); }

    public int getAction() { return action; }
    public void setAction(int action) { this.action = clamp(action); }

    public int getMystery() { return mystery; }
    public void setMystery(int mystery) { this.mystery = clamp(mystery); }

    public int getViolence() { return violence; }
    public void setViolence(int violence) { this.violence = clamp(violence); }

    public int getDarkness() { return darkness; }
    public void setDarkness(int darkness) { this.darkness = clamp(darkness); }
}
